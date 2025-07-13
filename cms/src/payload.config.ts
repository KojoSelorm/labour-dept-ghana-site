import path from 'path';
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { viteBundler } from '@payloadcms/bundler-vite';

// Define a simple Users collection
const Users = {
  slug: 'users',
  auth: true,
  admin: {
    use: 'email', // Use email for authentication in the admin panel
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL, // Essential for admin panel in Docker
  admin: {
    bundler: viteBundler(),
  },
  editor: lexicalEditor(),
  collections: [
    Users, // Include the Users collection
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
});