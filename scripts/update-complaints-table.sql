-- Add reference_number column to complaints table if it doesn't exist
ALTER TABLE complaints 
ADD COLUMN IF NOT EXISTS reference_number VARCHAR(20) UNIQUE;

-- Create index for reference number lookups
CREATE INDEX IF NOT EXISTS idx_complaints_reference_number ON complaints(reference_number);

-- Update existing complaints with reference numbers if they don't have them
UPDATE complaints 
SET reference_number = 'LC-' || LPAD(id::text, 8, '0')
WHERE reference_number IS NULL;
