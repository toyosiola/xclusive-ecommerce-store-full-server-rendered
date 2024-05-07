function LtdOfferTimerDigit({ value, parameter }) {
  return (
    <div className="flex h-16 w-16 flex-col flex-wrap items-center justify-center rounded-full bg-white text-black">
      <h4 className="font-inter font-semibold leading-none">{value}</h4>
      <p className="text-xs">{parameter}</p>
    </div>
  );
}

export default LtdOfferTimerDigit;
