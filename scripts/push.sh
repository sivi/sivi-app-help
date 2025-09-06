. ./.env

echo "Deploying to S3 and CF..."
echo $CF_DIST
aws s3 sync --acl public-read build s3://support.sivi.ai --delete
aws cloudfront create-invalidation --distribution-id $CF_DIST --paths "/*"
