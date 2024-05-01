type sub = {
    id : Number,
}

export type jwtSign = {
  kind: String,
  sub: sub,
  iat: Number,
  exp: Number,
}