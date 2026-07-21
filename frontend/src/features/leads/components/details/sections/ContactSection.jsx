export default function ContactSection({ data }) {
  if (!data?.contact) return null;
  const { mobile, email, locationStr } = data.contact;

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Mobile</span>
        <span className="font-medium text-gray-900">{mobile}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Email</span>
        <span className="font-medium text-gray-900">{email}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Location</span>
        <span className="font-medium text-gray-900">{locationStr}</span>
      </div>
    </>
  );
}
