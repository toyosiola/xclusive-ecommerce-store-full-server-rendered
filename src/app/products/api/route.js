export async function GET(req) {
  const searchParams = req.nextUrl.params;
  console.log(req);
  return Response.json({ msg: "products fetched" });
}
