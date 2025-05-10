import { companyInfo, features } from '@/app/lib/data';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About NRB Markketings</h1>
        <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {companyInfo.aboutShort}
        </div>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="mb-4">
            Excellence in product delivery; continuous improvement; global network expansion; world-class standards; high-quality service.
          </p>
          <h2 className="text-3xl font-bold mb-6 mt-8">Our Mission</h2>
          <p>
            To uphold our vision by continuously innovating service delivery, expanding our reach, and maintaining unwavering quality and client satisfaction.
          </p>
        </div>
        <div className="bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Company Profile</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0h-7.5M12 1.5C12.8284 1.5 13.5 2.17157 13.5 3C13.5 3.82843 12.8284 4.5 12 4.5C11.1716 4.5 10.5 3.82843 10.5 3C10.5 2.17157 11.1716 1.5 12 1.5Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Experience</h4>
                <p>Over 15 years serving government departments across India</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Quality Assurance</h4>
                <p>Strict quality control processes for all products</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879 2.394m1.96-5.397L8.879 12.97l-3.275-1.254M12 6h.003v.007l-.006-.007L12 6Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold">Customer Satisfaction</h4>
                <p>100% client satisfaction through reliable services</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-3">Electronics & Peripherals</h3>
            <p className="text-muted-foreground mb-4">
              High-quality electronics including TVs, computers, and peripherals for government departments and businesses.
            </p>
            <a href="/products#electronics" className="text-primary hover:underline font-medium">
              View Products &rarr;
            </a>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-3">Chemical & Cleaning Materials</h3>
            <p className="text-muted-foreground mb-4">
              Industrial-grade cleaning solutions, detergents, and specialty chemicals for various applications.
            </p>
            <a href="/products#chemicals" className="text-primary hover:underline font-medium">
              View Products &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}