import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('❌ Error al obtener publicaciones:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setMessage('⚠️ Debes iniciar sesión para publicar.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, author_id: user.id }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('✅ Publicación añadida con éxito.');
                setPosts([{ ...formData, first_name: user.first_name, last_name: user.last_name, created_at: new Date().toISOString() }, ...posts]);
                setFormData({ title: '', content: '' });
            } else {
                setMessage(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ Error de conexión con el servidor.');
        }
    };

    return (
        <div className="blog-container">
            <h1>Blog de Publicaciones</h1>

            {message && <p className="blog-message">{message}</p>}

            {user && (
                <form className="blog-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                    <textarea name="content" placeholder="Contenido" value={formData.content} onChange={handleChange} required />
                    <button type="submit">Publicar</button>
                </form>
            )}

            <div className="blog-posts">
                {posts.map((post) => (
                    <div key={post.idpost} className="post-card">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p><strong>Autor:</strong> {post.first_name} {post.last_name}</p>
                        <p><small>{new Date(post.created_at).toLocaleString()}</small></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
