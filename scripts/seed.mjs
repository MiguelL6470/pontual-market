import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar categorias
  const categories = [
    { name: 'Eletrônicos', slug: 'eletronicos' },
    { name: 'Casa e Cozinha', slug: 'casa-cozinha' },
    { name: 'Esporte', slug: 'esporte' },
    { name: 'Moda', slug: 'moda' },
    { name: 'Informática', slug: 'informatica' },
    { name: 'Casa e Decoração', slug: 'casa-decoracao' },
  ]
  
  const createdCategories = []
  for (const c of categories) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: {},
    })
    createdCategories.push(category)
  }
  console.log('✅ Categorias criadas/atualizadas:', createdCategories.length)

  // Criar um usuário lojista
  const merchantUser = await prisma.user.upsert({
    where: { email: 'lojista@pontualmarket.com' },
    create: {
      email: 'lojista@pontualmarket.com',
      name: 'Pontual Market Store',
      role: 'MERCHANT',
    },
    update: {},
  })
  console.log('✅ Usuário lojista criado:', merchantUser.email)

  // Criar perfil de merchant
  const merchant = await prisma.merchant.upsert({
    where: { userId: merchantUser.id },
    create: {
      userId: merchantUser.id,
      storeName: 'Pontual Market Store',
      description: 'A melhor loja para encontrar produtos de qualidade',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
    },
    update: {},
  })
  console.log('✅ Merchant criado:', merchant.storeName)

  // Criar produtos de teste
  const products = [
    {
      title: 'Smartphone Samsung Galaxy A05s 128GB',
      slug: 'smartphone-samsung-galaxy-a05s',
      description: 'Smartphone Samsung Galaxy A05s com 128GB de armazenamento, 6GB RAM e câmera tripla de 50MP. Tela de 6.7 polegadas Full HD+ e bateria de longa duração.',
      priceCents: 69900, // R$ 699.00
      stock: 50,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: [
        { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', alt: 'Smartphone Samsung', position: 0 },
      ],
    },
    {
      title: 'Notebook Lenovo Ideapad 15" Intel Core i5',
      slug: 'notebook-lenovo-ideapad-15',
      description: 'Notebook Lenovo Ideapad com processador Intel Core i5, 8GB RAM, 512GB SSD e tela de 15.6 polegadas. Ideal para trabalho e estudos.',
      priceCents: 299900, // R$ 2999.00
      stock: 25,
      categoryId: createdCategories[4].id, // Informática
      images: [
        { url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', alt: 'Notebook Lenovo', position: 0 },
      ],
    },
    {
      title: 'Tênis Nike Air Max 270 Masculino',
      slug: 'tenis-nike-air-max-270',
      description: 'Tênis Nike Air Max 270 masculino, tecnologia Air Max para máxima absorção de impacto. Conforto e estilo para o dia a dia.',
      priceCents: 59990, // R$ 599.90
      stock: 100,
      categoryId: createdCategories[3].id, // Moda
      images: [
        { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', alt: 'Tênis Nike', position: 0 },
      ],
    },
    {
      title: 'Panela de Pressão Tramontina 4.5L',
      slug: 'panela-pressao-tramontina',
      description: 'Panela de Pressão Tramontina de 4.5 litros, com revestimento antiaderente. Perfeita para cozimento rápido e eficiente.',
      priceCents: 12990, // R$ 129.90
      stock: 75,
      categoryId: createdCategories[1].id, // Casa e Cozinha
      images: [
        { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400', alt: 'Panela de Pressão', position: 0 },
      ],
    },
    {
      title: 'Bicicleta Mountain Bike Caloi 21 Marchas',
      slug: 'bicicleta-mountain-bike-caloi',
      description: 'Bicicleta Mountain Bike Caloi com 21 marchas, freios a disco e suspensão dianteira. Ideal para trilhas e uso urbano.',
      priceCents: 79900, // R$ 799.00
      stock: 30,
      categoryId: createdCategories[2].id, // Esporte
      images: [
        { url: 'https://images.unsplash.com/photo-1544191696-43aba80eab23?w=400', alt: 'Bicicleta', position: 0 },
      ],
    },
    {
      title: 'Smart TV LG 43" 4K UHD',
      slug: 'smart-tv-lg-43-4k',
      description: 'Smart TV LG 43 polegadas 4K UHD com webOS. Processador Quad Core, HDR e suporte a Alexa e Google Assistant.',
      priceCents: 199900, // R$ 1999.00
      stock: 20,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: [
        { url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400', alt: 'Smart TV', position: 0 },
      ],
    },
    {
      title: 'Kit 5 Almofadas Decorativas 50x50cm',
      slug: 'kit-almofadas-decorativas',
      description: 'Kit com 5 almofadas decorativas de 50x50cm, capas removíveis e tecido suave. Perfeito para decorar sala e quarto.',
      priceCents: 8990, // R$ 89.90
      stock: 120,
      categoryId: createdCategories[5].id, // Casa e Decoração
      images: [
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', alt: 'Almofadas', position: 0 },
      ],
    },
    {
      title: 'Fone de Ouvido Bluetooth JBL Tune 510BT',
      slug: 'fone-ouvido-bluetooth-jbl',
      description: 'Fone de ouvido Bluetooth JBL Tune 510BT, bateria de 40 horas e som Pure Bass. Conforto para uso prolongado.',
      priceCents: 29990, // R$ 299.90
      stock: 60,
      categoryId: createdCategories[0].id, // Eletrônicos
      images: [
        { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', alt: 'Fone de Ouvido', position: 0 },
      ],
    },
    {
      title: 'Camiseta Polo Masculina Básica',
      slug: 'camiseta-polo-masculina',
      description: 'Camiseta Polo masculina básica, 100% algodão, manga curta. Disponível em várias cores. Conforto e durabilidade.',
      priceCents: 4990, // R$ 49.90
      stock: 200,
      categoryId: createdCategories[3].id, // Moda
      images: [
        { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', alt: 'Camiseta Polo', position: 0 },
      ],
    },
    {
      title: 'Tablet Samsung Galaxy Tab A9 64GB',
      slug: 'tablet-samsung-galaxy-tab-a9',
      description: 'Tablet Samsung Galaxy Tab A9 com 64GB de armazenamento e 4GB RAM. Tela de 8.7 polegadas, ideal para entretenimento.',
      priceCents: 89900, // R$ 899.00
      stock: 35,
      categoryId: createdCategories[4].id, // Informática
      images: [
        { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', alt: 'Tablet Samsung', position: 0 },
      ],
    },
    {
      title: 'Mochila Executiva Antifurto 15.6"',
      slug: 'mochila-executiva-antifurto',
      description: 'Mochila executiva antifurto para notebook até 15.6", bolso para laptop acolchoado, organização interna e design moderno.',
      priceCents: 8990, // R$ 89.90
      stock: 80,
      categoryId: createdCategories[3].id, // Moda
      images: [
        { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', alt: 'Mochila', position: 0 },
      ],
    },
    {
      title: 'Jogo de Panelas Antiaderente 10 Peças',
      slug: 'jogo-panelas-antiaderente',
      description: 'Jogo completo de panelas antiaderente com 10 peças. Revitalizado com Teflon, cabo ergonômico e design moderno.',
      priceCents: 34990, // R$ 349.90
      stock: 45,
      categoryId: createdCategories[1].id, // Casa e Cozinha
      images: [
        { url: 'https://images.unsplash.com/photo-1556910980-5a0bb0c18c28?w=400', alt: 'Panelas', position: 0 },
      ],
    },
  ]

  for (const productData of products) {
    const { images, ...productInfo } = productData
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      create: {
        ...productInfo,
        merchantId: merchant.id,
        status: 'ACTIVE',
        images: {
          create: images,
        },
      },
      update: {},
      include: { images: true },
    })
  }
  console.log('✅ Produtos de teste criados:', products.length)
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
