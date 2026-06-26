import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';

export const s3 = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const BUCKET = process.env.AWS_S3_BUCKET!;

/**
 * Upload a Buffer/Stream to S3.
 * Returns the public HTTPS URL.
 */
export async function uploadToS3(
    key: string,
    body: Buffer | Readable,
    contentType: string
): Promise<string> {
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType,
        },
    });

    await upload.done();
    return `https://${BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
}

/**
 * Delete an object from S3 by key.
 */
export async function deleteFromS3(key: string): Promise<void> {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

/**
 * Extract the S3 key from a full S3 URL.
 */
export function keyFromUrl(url: string): string {
    const u = new URL(url);
    return u.pathname.slice(1); // strip leading /
}
