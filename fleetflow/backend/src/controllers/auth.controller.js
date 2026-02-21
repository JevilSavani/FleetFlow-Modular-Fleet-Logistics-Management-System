import { supabase } from '../supabaseClient.js';

export const login = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Get user role from profiles table
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', data.user.id)
            .single();

        res.json({
            message: 'Login successful',
            user: {
                id: data.user.id,
                email: data.user.email,
                role: profile?.role || 'viewer',
                name: profile?.full_name
            },
            session: data.session
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const logout = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Logout successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.FRONTEND_URL}/reset-password`
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const { error } = await supabase.auth.updateUser({
            password
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.id)
            .single();

        res.json({
            id: user.id,
            email: user.email,
            role: profile?.role || 'viewer',
            name: profile?.full_name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
