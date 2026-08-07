function AnalyticsSection({
  children,
}) {
  return (
    <section className="mt-8 grid gap-6 xl:grid-cols-2">
      {children}
    </section>
  );
}

export default AnalyticsSection;