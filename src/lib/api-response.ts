import { NextResponse } from 'next/server'

/**
 * Resposta de sucesso padrão para APIs
 */
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}

/**
 * Resposta de erro padrão para APIs
 */
export function errorResponse(
  error: string,
  status: number = 400,
  details?: any
) {
  return NextResponse.json({ error, ...(details && { details }) }, { status })
}

/**
 * Resposta de não autorizado
 */
export function unauthorizedResponse() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}

/**
 * Resposta de erro do servidor
 */
export function serverErrorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status })
}


