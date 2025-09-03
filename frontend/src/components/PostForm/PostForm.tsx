import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Post } from '../../redux/postsSlice';
import styles from './PostForm.module.css';
import commonStyles from '../../styles/common.module.css';

interface Props {
  initialData?: Partial<Post>;
  onSubmit: (data: { title: string; content: string; author: string }) => Promise<void>;
}

interface FormData {
  title: string;
  content: string;
  author: string;
}

const schema = yup.object({
  title: yup.string().trim().required('Title is required').min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  content: yup.string().trim().required('Content is required').min(10, 'Content must be at least 10 characters').max(2000, 'Content cannot exceed 2000 characters'),
  author: yup.string().trim().required('Author is required').min(2, 'Author name must be at least 2 characters').max(50, 'Author name cannot exceed 50 characters'),
}).required();

export const PostForm = ({ initialData, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      author: initialData?.author || '',
    },
  });

  const onFormSubmit = async (data: FormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Title"
          {...register('title')}
          className={`${commonStyles.input} ${errors.title ? commonStyles.error : ''}`}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p id="title-error" className={commonStyles.errorMessage}>{errors.title.message}</p>}
      </div>
      
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Author"
          {...register('author')}
          className={`${commonStyles.input} ${errors.author ? commonStyles.error : ''}`}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && <p id="author-error" className={commonStyles.errorMessage}>{errors.author.message}</p>}
      </div>
      <div className={styles.field}>
        <textarea
          placeholder="Content"
          {...register('content')}
          className={`${commonStyles.textarea} ${errors.content ? commonStyles.error : ''}`}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && <p id="content-error" className={commonStyles.errorMessage}>{errors.content.message}</p>}
      </div>
      <button type="submit" className={commonStyles.button} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};