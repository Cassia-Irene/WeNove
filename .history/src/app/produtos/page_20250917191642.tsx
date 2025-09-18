                      <span className="flex items-center justify-center w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs sm:text-sm font-dosis font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={product.sellerAvatar || "/placeholder.svg"}
                        alt={product.seller}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <span className="font-dosis font-bold text-sm text-[#88A51D]">
                        {product.seller}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">Nenhum produto encontrado com os filtros aplicados.</p>
          )}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-20 mb-20">
          <Button
            variant="outline"
            className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent"
          >
            ←
          </Button>
          <Button className="bg-[#88a51d] text-white hover:bg-[#708943]">
            Página seguinte →
          </Button>
          <div className="text-[#8f3332] font-dosis">
            Página <span className="font-bold">1</span> de 10
          </div>
        </div>
      </main>
    </div>
  )
}