export default function handler(req: Request, res: any): void  {
  res.status(200).json({ name: "John Doe" });
}
