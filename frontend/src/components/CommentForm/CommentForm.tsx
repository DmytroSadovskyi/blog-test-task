import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './CommentForm.module.css';
import commonStyles from '../../styles/common.module.css';

interface Props {
  onSubmit: (author: string, content: string) => void;
}

interface FormData {
  author: string;
  text: string;
}

const schema = yup.object({
  author: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
  text: yup.string().required('Comment is required').min(5, 'Comment must be at least 5 characters').max(500, 'Comment cannot exceed 500 characters'),
}).required();

export const CommentForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { author: '', text: '' },
  });

  const onFormSubmit = (data: FormData) => {
    onSubmit(data.author, data.text);
    reset();
  };

  return (
    <div className={commonStyles.container}>
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Your name"
            {...register('author')}
            className={`${commonStyles.input} ${errors.author ? commonStyles.error : ''}`}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? 'author-error' : undefined}
          />
          {errors.author && <p id="author-error" className={commonStyles.errorMessage}>{errors.author.message}</p>}
        </div>
        <div className={styles.field}>
          <textarea
            placeholder="Your comment"
            {...register('text')}
            className={`${commonStyles.textarea} ${errors.text ? commonStyles.error : ''}`}
            aria-invalid={!!errors.text}
            aria-describedby={errors.text ? 'text-error' : undefined}
          />
          {errors.text && <p id="text-error" className={commonStyles.errorMessage}>{errors.text.message}</p>}
        </div>
        <button type="submit" className={commonStyles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add comment'}
        </button>
      </form>
    </div>
  );
};