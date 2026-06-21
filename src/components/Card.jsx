export default function Card({ title, description }) {
  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}