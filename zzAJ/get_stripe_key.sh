#!/bin/bash 
#  echo "sk_test_51NYu1ML9zoTSpcm6sVsbV0s9VyYo3bZD9rj1ke8qODPi3UlfU4EALwXF9qG210XBNDt4haPq4fF7UyCxwXaLjd6Z00Hir7X8Y7:" | base64 | clipcopy |
#     echo "Stripe key copied to clipboard"

# Path: get_stripe_key.sh
curl https://api.stripe.com/v1/customers \
  -u c2tfdGVzdF81MU5ZdTFNTDl6b1RTcGNtNnNWc2JWMHM5VnlZbzNiWkQ5cmoxa2U4cU9EUGkzVWxmVTRFQUx3WEY5cUcyMTBYQk5EdDRoYVBxNGZGN1V5Q3h3WGFMamQ2WjAwSGlyN1g4WTc6Cg==:
>> stripe_key.txt
echo "Stripe key copied to stripe_key.txt"
cat stripe_key.txt
exit 0
