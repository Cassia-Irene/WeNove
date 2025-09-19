{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    {/* Grade de produtos */}
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:mb-10 justify-items-center">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.id}`}
            className="w-full flex justify-center"
          >
            <Card className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px] py-0 cursor-pointer">
              <div className="w-full h-[240px]">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={240}
                  className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-dosis font-semibold text-[#0C3729] mb-0 text-sm sm:text-base md:text-base lg:text-base">
                    {product.name}
                  </h3>

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
                    className="rounded-full object-cover w-9 h-9"
                  />
                  <span className="font-dosis font-bold text-sm text-[#88A51D]">
                    {product.seller}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>

    {/* Sidebar de filtros */}
    <aside className="lg:col-span-1">
      <Filtros />
    </aside>
  </div>

  {/* Botões de paginação */}
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
