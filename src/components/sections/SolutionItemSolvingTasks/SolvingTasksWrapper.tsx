import withErrorBoundary from '@/hocs/withErrorBoundary';
import { SolvingTaskListType, SolutionSolvingTaskType } from '@/types/components/solutions';
import SolutionItemSolvingTasks from '.';
import { getFile } from '@/api';

type Props = {
  solvingTasks: SolutionSolvingTaskType,
  scrollTargetId: string,
  label: string,
};

const enrichListWithLottie = async (list: SolvingTaskListType[]): Promise<SolvingTaskListType[]> => {
  const enrichedList = await Promise.all(
    list.map(async (item) => {
      const enrichedChildren = await Promise.all(
        item.children.map(async (child) => {
          try {
            const parsedLottieFile = await getFile(child.lottie_file);
            return { ...child, parsedLottieFile };
          } catch (error) {
            // Если что-то пошло не так — просто возвращаем без parsedLottieFile
            console.warn(`Error loading file for child ID ${child.id}:`, error);
            return { ...child };
          }
        })
      );

      return { ...item, children: enrichedChildren };
    })
  );

  return enrichedList;
};

const SolvingTasksWrapper = async ({ solvingTasks, scrollTargetId, label }: Props) => {
  const changedTasksList = await enrichListWithLottie(solvingTasks.list);

  const changedSolvingTasks = {
    ...solvingTasks,
    list: changedTasksList,
  };

  return (
    <SolutionItemSolvingTasks
      solvingTasks={changedSolvingTasks}
      scrollTargetId={scrollTargetId}
      label={label}
    />
  );
};

export default withErrorBoundary(SolvingTasksWrapper);
