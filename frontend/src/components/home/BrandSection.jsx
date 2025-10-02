import brand1 from "../../assets/images/brand1.PNG";
import brand2 from "../../assets/images/brand2.PNG";
import brand3 from "../../assets/images/brand3.PNG";
import brand4 from "../../assets/images/brand4.PNG";

export default function BrandsSection() {
  const brands = [brand1, brand2, brand3, brand4];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#CD3A00] mb-8">
          Trusted Brands We Work With
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={brand}
                alt={`Brand ${index + 1}`}
                className="h-20 lg:h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
