function EditableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow items-center justify-between">
      {children}
    </div>
  );
}

export default EditableWrapper;
