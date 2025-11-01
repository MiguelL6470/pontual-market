'use client'

import { useState, useCallback, useEffect } from 'react'
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type ImageFile = {
  file?: File
  url: string
  uploading?: boolean
  error?: string
}

type Props = {
  maxImages?: number
  onImagesChange: (images: Array<{ url: string; alt?: string; position: number }>) => void
  initialImages?: Array<{ url: string; alt?: string }>
}

export function ImageUploader({ maxImages = 8, onImagesChange, initialImages = [] }: Props) {
  const [images, setImages] = useState<ImageFile[]>(
    initialImages.map(img => ({ url: img.url }))
  )
  const [dragging, setDragging] = useState(false)

  const uploadImage = async (file: File, index: number): Promise<string> => {
    // Validar arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      throw new Error('Formato inválido. Use JPG, PNG ou WebP.')
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Imagem muito grande. Máximo 5MB.')
    }

    // Gerar key única
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).slice(2, 9)
    const extension = file.name.split('.').pop()
    const key = `uploads/${timestamp}-${randomId}.${extension}`

    // Obter URL assinada
    const signedUrlRes = await fetch('/api/uploads/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bucket: 'products',
        key,
        expiresIn: 3600,
      }),
    })

    if (!signedUrlRes.ok) {
      throw new Error('Erro ao gerar URL de upload')
    }

    const response = await signedUrlRes.json()
    if (!response.success) {
      throw new Error('Erro ao gerar URL de upload')
    }

    const { url: signedUrl, publicUrl } = response.data

    // Upload para Supabase
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!uploadRes.ok) {
      throw new Error('Erro ao fazer upload da imagem')
    }

    // Retornar URL pública
    return publicUrl
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const filesArray = Array.from(files)
    const remainingSlots = maxImages - images.filter(img => !img.error && !img.uploading).length

    if (filesArray.length > remainingSlots) {
      alert(`Você pode adicionar apenas mais ${remainingSlots} imagem(ns)`)
      return
    }

    // Adicionar arquivos ao estado
    const newImages: ImageFile[] = filesArray.map(file => ({
      file,
      url: URL.createObjectURL(file),
      uploading: true,
    }))

    setImages(prev => [...prev, ...newImages])

    // Fazer upload de cada imagem
    filesArray.forEach(async (file, idx) => {
      const imageIndex = images.length + idx

      try {
        const url = await uploadImage(file, imageIndex)
        
        setImages(prev => {
          const updated = [...prev]
          updated[imageIndex] = { ...updated[imageIndex], url, uploading: false }
          return updated
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        setImages(prev => {
          const updated = [...prev]
          updated[imageIndex] = { ...updated[imageIndex], uploading: false, error: message }
          return updated
        })
      }
    })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [images.length, maxImages]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }, [])

  // Notificar mudanças no componente pai apenas quando images mudar
  useEffect(() => {
    const validImages = images.filter(img => !img.error && !img.uploading)
    const validImageUrls = validImages.map((img, idx) => ({
      url: img.url,
      position: idx,
    }))
    onImagesChange(validImageUrls)
  }, [images, onImagesChange])

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Imagens do Produto
        <span className="text-xs text-gray-500 ml-2">
          (Máximo {maxImages}, JPG/PNG/WebP até 5MB)
        </span>
      </label>

      {/* Grid de imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 group"
            >
              {/* Preview */}
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay com status */}
              {image.uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}

              {image.error && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-90 flex flex-col items-center justify-center p-2">
                  <AlertCircle className="w-6 h-6 text-white mb-1" />
                  <p className="text-xs text-white text-center">{image.error}</p>
                </div>
              )}

              {!image.uploading && !image.error && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              {/* Botão remover */}
              {!image.uploading && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Área de upload */}
      {images.filter(img => !img.error && !img.uploading).length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center
            ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            transition-colors cursor-pointer
          `}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="image-upload"
            disabled={images.length >= maxImages}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              {dragging ? (
                <>
                  <ImageIcon className="w-12 h-12 text-blue-500" />
                  <p className="text-blue-600 font-medium">Solte as imagens aqui</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-gray-600 font-medium">
                      Clique para upload ou arraste as imagens
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG ou WebP até 5MB cada
                    </p>
                  </div>
                </>
              )}
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

