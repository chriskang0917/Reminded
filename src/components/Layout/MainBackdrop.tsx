function MainBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-20">
      <div className="fixed left-0 top-0 h-[100svh] w-full rounded-[40px] bg-white shadow-md md:ml-60 md:w-[calc(100%-245px)]" />
      {children}
    </div>
  );
}

export default MainBackdrop;
