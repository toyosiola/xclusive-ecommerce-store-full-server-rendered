function FlashSalesTimerDigit({ value, parameter }) {
  return (
    <div className="space-y-2 text-center">
      {/* days */}
      <p className="text-xs font-medium">{parameter}</p>
      <h4 className="font-inter text-3xl font-bold leading-none">{value}</h4>
    </div>
  );
}

export default FlashSalesTimerDigit;
