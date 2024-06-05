export default function BreadCrumb({ page, product }) {
  return (
    <p className="mb-10 flex flex-wrap items-center gap-3 text-sm text-black/50">
      Home<span>/</span>
      <span className={product ? "text-black/50" : "text-black"}>{page}</span>
      {product && (
        <>
          <span>/</span>
          <span className="capitalize text-black">{product}</span>
        </>
      )}
    </p>
  );
}
