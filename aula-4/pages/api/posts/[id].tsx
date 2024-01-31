import type { NextApiHandler } from 'next';

export type ResponseData = {
  post: string;
};

const handler: NextApiHandler<ResponseData> = (req, res) => {
  const id = req.query.id as string;
  res.status(200).json({ post: id })
}

export default handler;
