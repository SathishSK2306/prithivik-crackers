export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Prithivik Crackers</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 1985 in Sivakasi, Tamil Nadu, Prithivik Crackers began as
            a small family-owned business with a passion for creating
            high-quality fireworks and crackers.
          </p>
          <p>
            Over the decades, we've grown into one of the most trusted names in
            the industry, known for our commitment to safety, innovation, and
            traditional craftsmanship.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            To provide the highest quality crackers while maintaining strict
            safety standards and preserving the traditional art of firework
            making.
          </p>
          <p>
            We believe in celebrating India's festivals with joy, safety, and
            environmental responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>35+ years of experience in the industry</li>
            <li>100% eco-friendly and safe products</li>
            <li>ISO certified manufacturing process</li>
            <li>Direct from manufacturer pricing</li>
            <li>Pan-India delivery network</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
