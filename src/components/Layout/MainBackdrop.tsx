function MainBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-50">
      <div className="fixed left-0 top-0 ml-60 h-[100svh] w-full rounded-[40px] bg-white shadow-md" />
      {children}
    </div>
  );
}

export default MainBackdrop;
