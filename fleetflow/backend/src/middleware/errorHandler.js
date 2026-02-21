export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Supabase errors
    if (err.code) {
        return res.status(400).json({
            error: err.message || 'Database error',
            code: err.code
        });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation failed',
            details: err.details
        });
    }

    // Default error
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
};

export const notFound = (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
};
