function SectionTag({ tag }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="h-10 w-5 rounded bg-secondary2"></div>
      <p className="text-secondary2">{tag}</p>
    </div>
  );
}

export default SectionTag;
