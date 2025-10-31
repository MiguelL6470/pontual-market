import { z } from 'zod'

export const MerchantSchema = z.object({
  storeName: z.string().min(2).max(80),
  description: z.string().max(500).optional().or(z.literal('')),
  logoUrl: z.string().url().optional(),
  phone: z.string().max(40).optional(),
  address: z.string().max(200).optional(),
})

export const ProductSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(1).max(2000),
  priceCents: z.number().int().min(0),
  stock: z.number().int().min(0).default(0),
  categoryId: z.string().cuid(),
  images: z.array(
    z.object({ url: z.string().url(), alt: z.string().max(120).optional(), position: z.number().int().min(0).default(0) })
  ).max(8).default([]),
})

export const SearchQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').max(100),
})

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})


