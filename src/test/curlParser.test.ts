import * as assert from 'assert';
import yargs from 'yargs';

describe('Curl Command Parser', () => {
  // Define the interface for the return type
  interface CurlRequest {
    url: string;
    method: string;
    headers: string[];
    body: string;
  }

  // The code you're testing
  const parseCurlCommand = (curlCommand: string): CurlRequest => {
    if (!curlCommand) {
      throw new Error('Invalid curl command.');
    }
    // Remove "curl" part of the command
    const cleanedCommand = curlCommand.replace(/^curl\s+/g, '');

    // Use yargs to parse the cleaned curl command
    const parsed = yargs(cleanedCommand)
      .option('X', { type: 'string', alias: 'method' })
      .option('H', { type: 'array', alias: 'headers' })
      .option('data-raw', { type: 'string', alias: 'body' })
      .parse() as { [key: string]: any }; 

    const method = parsed.method || 'GET'; 
    const url = parsed._[0]?.replace(/^['"]|['"]$/g, '') || ''; 
    const headers = parsed.headers || [];
    const body = parsed.body || '';

    if (url) {
      return { url, method, headers, body };
    } else {
      throw new Error('Invalid curl command. Could not extract URL.');
    }
  };

  it('should parse GET request with headers and no body', () => {
    const curlCommand = 'curl -X GET "https://example.com" -H "Authorization: Bearer token"';
    const result = parseCurlCommand(curlCommand);
    assert.strictEqual(result.url, 'https://example.com');
    assert.strictEqual(result.method, 'GET');
    assert.deepStrictEqual(result.headers, ['Authorization: Bearer token']);
    assert.strictEqual(result.body, '');
  });

  it('should parse POST request with headers and body', () => {
    const curlCommand = 'curl -X POST "https://example.com" -H "Content-Type: application/json" --data-raw \'{"key":"value"}\'';
    const result = parseCurlCommand(curlCommand);
    assert.strictEqual(result.url, 'https://example.com');
    assert.strictEqual(result.method, 'POST');
    assert.deepStrictEqual(result.headers, ['Content-Type: application/json']);
    assert.strictEqual(result.body, '{"key":"value"}');
  });

  it('should parse request with no method (default GET)', () => {
    const curlCommand = 'curl "https://example.com"';
    const result = parseCurlCommand(curlCommand);
    assert.strictEqual(result.url, 'https://example.com');
    assert.strictEqual(result.method, 'GET');
    assert.deepStrictEqual(result.headers, []);
    assert.strictEqual(result.body, '');
  });

  it('should throw an error if URL is missing', () => {
    const curlCommand = 'curl -X GET';
    assert.throws(() => parseCurlCommand(curlCommand), /Invalid curl command. Could not extract URL/);
  });

  it('should parse multiple headers correctly', () => {
    const curlCommand = 'curl -X GET "https://example.com" -H "Authorization: Bearer token" -H "User-Agent: MyApp"';
    const result = parseCurlCommand(curlCommand);
    assert.strictEqual(result.url, 'https://example.com');
    assert.strictEqual(result.method, 'GET');
    assert.deepStrictEqual(result.headers, ['Authorization: Bearer token', 'User-Agent: MyApp']);
    assert.strictEqual(result.body, '');
  });
});
