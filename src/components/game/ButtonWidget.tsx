export function ButtonWidget() {
  return (
    <section className="grid grid-cols-2 gap-1 p-1 sm:hidden">
      <button className="grad-slate hover-grad-slate bg-gradient-to-t">
        chat btn
      </button>
      <button className="grad-slate hover-grad-slate bg-gradient-to-t">
        info btn
      </button>
    </section>
  );
}
