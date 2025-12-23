-- Migration: Add status tracking and response functionality to feedback system
-- Created: 2024-12-23
-- Description: Adds status, admin_response, and responded_at columns to site_feedback table

-- Add status column with default value 'new'
ALTER TABLE site_feedback
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'resolved'));

-- Add admin response columns
ALTER TABLE site_feedback
ADD COLUMN IF NOT EXISTS admin_response text,
ADD COLUMN IF NOT EXISTS responded_at timestamptz;

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_site_feedback_status ON site_feedback(status);

-- Create index on responded_at for tracking response times
CREATE INDEX IF NOT EXISTS idx_site_feedback_responded_at ON site_feedback(responded_at);

-- Update existing feedback to have 'new' status if null
UPDATE site_feedback
SET status = 'new'
WHERE status IS NULL;

-- Add comment to table
COMMENT ON TABLE site_feedback IS 'User feedback submissions with status tracking and admin response functionality';
COMMENT ON COLUMN site_feedback.status IS 'Current status of feedback: new, in-progress, or resolved';
COMMENT ON COLUMN site_feedback.admin_response IS 'Admin response to the feedback';
COMMENT ON COLUMN site_feedback.responded_at IS 'Timestamp when admin responded to feedback';
