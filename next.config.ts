//  @type {import('next').NextConfig}
import type { NextConfig } from 'next';

const url = "mongodb+srv://054racheli:AB502sO6yjU9TWoZ@cluster0.08t3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const nextConfig: NextConfig = {
  env: {
    PUBLIC_DB_CONNECTION: url,
  },
}

export default nextConfig;
