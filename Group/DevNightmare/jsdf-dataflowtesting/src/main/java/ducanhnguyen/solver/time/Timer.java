package ducanhnguyen.solver.time;

import java.util.Calendar;

/**
 *
 * @author DucAnh
 *
 */
public class Timer implements ITimer {

    private int[] startTime = new int[3];
    private int[] endTime = new int[3];

    @Override
    public void start() {
        startTime[0] = Calendar.getInstance().get(Calendar.MINUTE);
        startTime[1] = Calendar.getInstance().get(Calendar.SECOND);
        startTime[2] = Calendar.getInstance().get(Calendar.MILLISECOND);
    }

    @Override
    public int getRunningTime() {
        int milisecond = (endTime[0] * 60000 + endTime[1] * 1000 + endTime[2])
                - (startTime[0] * 60000 + startTime[1] * 1000 + startTime[2]);
        return milisecond;
    }

    @Override
    public void end() {
        endTime[0] = Calendar.getInstance().get(Calendar.MINUTE);
        endTime[1] = Calendar.getInstance().get(Calendar.SECOND);
        endTime[2] = Calendar.getInstance().get(Calendar.MILLISECOND);
    }

    @Override
    public String toString() {
        return startTime[0] + "phut:" + startTime[1] + "giay:" + startTime[2] + " - " + endTime[0] + "phut:"
                + endTime[1] + "giay:" + endTime[2] + " = " + getRunningTime() + "ms";
    }
}
