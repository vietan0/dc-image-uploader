const req = require('supertest');
const makeApp = require('./makeApp');

/* global jest, describe, test, expect */
const fakeGetAllImages = jest.fn();
const fakeGetById = jest.fn();
const fakePostImage = jest.fn();
const fakeDeleteAllImages = jest.fn();

const fakeApp = makeApp({
  getAllImages: fakeGetAllImages,
  getById: fakeGetById,
  postImage: fakePostImage,
  deleteAllImages: fakeDeleteAllImages,
});

describe('API Routes', () => {
  test('getAllImages should work', async () => {
    fakeGetAllImages.mockReturnValue(['this array has 1 item']);
    const res = await req(fakeApp).get('/api/images');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(fakeGetAllImages.mock.calls).toHaveLength(1);
  });
  test('getById should work', async () => {
    const id = 'CvTcK8T8rXunYemG8xmxe';
    fakeGetById.mockReturnValue({
      path: 'path to image',
    });
    const res = await req(fakeApp).get(`/api/images/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(fakeGetById.mock.calls).toHaveLength(1);
  });
  test('postImage should work', async () => {
    const fakeImagePath = `${__dirname}/testImage.jpg`;

    fakePostImage.mockReturnValue({});

    const res = await req(fakeApp).post('/api/images').attach('fileFromReact', fakeImagePath);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(fakePostImage.mock.calls).toHaveLength(1);
  });
  test('deleteAllImages should work', async () => {
    const res = await req(fakeApp).delete('/api/images');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success');
  });
});
