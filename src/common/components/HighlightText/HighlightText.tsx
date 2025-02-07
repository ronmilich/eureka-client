import { Typography, TypographyProps } from '@mui/material';
import { Fragment } from 'react';

interface HighlightTextProps extends TypographyProps {
  text: string;
  className?: string;
  children?: string;
}

const HighlightText = ({ text, className = '', children, ...props }: HighlightTextProps) => {
  if (!children) return null;

  const trimmedText = text.trim();

  if (!trimmedText) return <Typography {...props}>{children}</Typography>;

  const words = trimmedText.toLowerCase().split(/\s+/);
  const matches = children.split(new RegExp(`(${words.join('|')})`, 'gi'));

  return (
    <Typography
      {...props}
      sx={(theme) => ({
        '& span': { backgroundColor: theme.palette.mode === 'dark' ? '#7a5d05' : '#ffecb2' },
      })}
    >
      {matches.map((match, index) => (
        <Fragment key={index}>
          {words.includes(match.toLowerCase()) ? <span className={className}>{match}</span> : match}
        </Fragment>
      ))}
    </Typography>
  );
};

export default HighlightText;
