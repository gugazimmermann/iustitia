export function FormatAddress({
  address,
  number,
  complement,
  neighborhood,
  city,
  state,
  zip,
}: {
  address: string | undefined;
  number: string | undefined;
  complement: string | undefined;
  neighborhood: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: string | undefined;
}) {
  return address ||
    number ||
    complement ||
    neighborhood ||
    city ||
    state ||
    zip ? (
    <div className="col-span-9">
      <p>
        {address && `${address}`}
        {address && number && `, `}
        {number && `${number}`}
        {(address || number) && complement && ` - `}
        {complement && `${complement}`}
      </p>
      <p>
        {neighborhood && `${neighborhood}`}
        {neighborhood && city && `, `}
        {city && `${city}`}
        {(neighborhood || city) && state && ` / `}
        {state && `${state}`}
        {(neighborhood || city || state) && zip && ` - `}
        {zip && `${zip}`}
      </p>
    </div>
  ) : null;
}

export default FormatAddress;
