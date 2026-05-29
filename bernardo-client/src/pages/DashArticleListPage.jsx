
import { useState } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import articlesData from '../assets/article-content.js';


const defaultForm = {
  name: '',
  title: '',
  image: '',
  desc: '',
  content: '',
  status: 'Active',
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState(articlesData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editIdx, setEditIdx] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleOpen = () => {
    setEditIdx(null);
    setForm(defaultForm);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditIdx(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    if (editIdx !== null) {
      // Edit mode
      setArticles((prev) => prev.map((a, i) => i === editIdx ? {
        ...form,
        content: form.content.split('\n'),
      } : a));
    } else {
      // Add mode
      setArticles([
        ...articles,
        {
          ...form,
          content: form.content.split('\n'),
        },
      ]);
    }
    handleClose();
  };
  const handleEdit = (idx) => {
    setEditIdx(idx);
    const a = articles[idx];
    setForm({
      ...a,
      content: Array.isArray(a.content) ? a.content.join('\n') : a.content,
    });
    setOpen(true);
  };
  const handleDelete = (idx) => {
    if (window.confirm('Delete this article?')) {
      setArticles((prev) => prev.filter((_, i) => i !== idx));
    }
  };
  const handleToggleStatus = (idx) => {
    setArticles((prev) => prev.map((a, i) => i === idx ? {
      ...a,
      status: a.status === 'Active' ? 'Inactive' : 'Active',
    } : a));
  };
  // Search and filter
  const filtered = articles.filter(a =>
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus ? a.status === filterStatus : true)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <h2 style={{ fontWeight: 700, fontSize: 28 }}>Article Management</h2>
          <div style={{ color: '#64748b', fontSize: 14 }}>Create, edit, and publish articles that also appear on the public article page.</div>
        </Box>
        <Button variant="contained" color="warning" onClick={handleOpen} sx={{ fontWeight: 700, px: 3, py: 1, borderRadius: 2 }}>
          + ADD ARTICLE
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Search articles" size="small" value={search} onChange={e => setSearch(e.target.value)} sx={{ minWidth: 200 }} />
        <TextField
          select
          label="Status"
          size="small"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Paragraphs</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((a, idx) => (
              <TableRow key={a.name + idx} hover>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.content?.length || 0}</TableCell>
                <TableCell>
                  <Chip
                    label={a.status || 'Active'}
                    color={a.status === 'Active' ? 'success' : 'default'}
                    size="small"
                    onClick={() => handleToggleStatus(articles.indexOf(a))}
                    sx={{ cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell>
                  {a.image ? <img src={a.image} alt="preview" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} /> : '—'}
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEdit(articles.indexOf(a))}>Edit</Button>
                  <Button size="small" variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => handleDelete(articles.indexOf(a))}>Delete</Button>
                  <Button size="small" variant="outlined" color={a.status === 'Active' ? 'secondary' : 'success'} onClick={() => handleToggleStatus(articles.indexOf(a))}>
                    {a.status === 'Active' ? 'Disable' : 'Enable'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No articles found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Article Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editIdx !== null ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Slug" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} fullWidth />
          <TextField label="Description" name="desc" value={form.desc} onChange={handleChange} fullWidth />
          <TextField
            label="Content paragraphs"
            name="content"
            value={form.content}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={4}
            helperText="Enter each paragraph on a new line."
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="warning">Save Article</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;