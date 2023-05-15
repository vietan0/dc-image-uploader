const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

require('dotenv').config();

const supabaseUrl = 'https://uzmvrzjfwrtyihijefxa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const client = createClient(supabaseUrl, supabaseKey);

const supabase = {
  async getAllImages() {
    const { data, error } = await client.from('images').select('*');
    return data;
  },
  async getById(id) {
    const { data, error } = await client.from('images').select('*').eq('image_id', id);
    return data[0];
  },
  async postImage(file) {
    const uploadInfo = { image_id: crypto.randomUUID(), ...file };
    const { data, error } = await client.from('images').insert([uploadInfo]).select();
    return data[0];
  },
  async deleteAllImages() {
    const { data, error } = await client.from('images').delete().neq('image_id', '');
  },
};

module.exports = supabase;
