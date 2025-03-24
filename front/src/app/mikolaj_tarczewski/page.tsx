import Navbar from '@/components/Navbar';
import PropertyForm from '@/components/PropertyForm';

export default function MikolajTarczewski() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto py-12">
          <PropertyForm />
        </div>
      </div>
    </main>
  );
}
