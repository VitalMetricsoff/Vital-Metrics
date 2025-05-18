# Email Security Configuration

## SPF Record Setup

Add the following SPF record to your domain's DNS settings:

```
v=spf1 include:_spf.google.com include:_spf.vitalmetrics.in ~all
```

### Steps to Add SPF Record

1. Log in to your domain registrar's DNS settings
2. Add a new TXT record
3. Set the host/name to @ or your domain name
4. Paste the SPF record above as the value
5. Save changes

### Verification

To verify your SPF record is working:

1. Use an SPF record checker tool
2. Send a test email and check the headers
3. Monitor your email delivery rates

## DMARC Policy

Consider implementing DMARC after SPF:

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@vitalmetrics.in
```

This helps prevent email spoofing and provides reporting.
