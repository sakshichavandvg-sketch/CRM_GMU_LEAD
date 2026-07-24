import { TableScrollProvider } from "@/providers/TableScrollProvider";

export default function ManagementLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      <TableScrollProvider>
        {children}
      </TableScrollProvider>
    </div>
  );
}
