aws s3 sync --acl public-read build s3://support.sivi.ai --delete
aws cloudfront create-invalidation --distribution-id E1JI64NM38JF6H --paths "/*"
