package solver.solverStrategy.random;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sourceforge.jeval.EvaluationException;
import net.sourceforge.jeval.Evaluator;
import solver.main.Utils1;
import solver.solverStrategy.ISolver;
import solver.symbolicExecution.ParseTestpath;
import solver.symbolicExecution.Utils;
import solver.symbolicExecution.myJeval;
import solver.time.Timer;

/**
 * Giáº£i há»‡ rÃ ng buá»™c sá»­ dá»¥ng kÄ© thuáº­t sinh ngáº«u nhiÃªn. CÃ¡c
 * biáº¿n trong há»‡ rÃ ng buá»™c kiá»ƒu sá»‘ nguyÃªn, sá»‘ thá»±c, biáº¿n
 * máº£ng 1 chiá»�u hoáº·c hai chiá»�u. Chá»‰ sá»‘ biáº¿n máº£ng lÃ  má»™t
 * biá»ƒu thá»©c khÃ´ng chá»©a biáº¿n máº£ng khÃ¡c. VÃ­ dá»¥: a[3] hay a[n+2]
 * lÃ  há»£p lá»‡; a[a[2]] hay a[a[2]+1] Ä‘á»�u khÃ´ng há»£p lá»‡
 *
 * @author anhanh
 *
 */
public class RandomSolver implements ISolver {

    private ArrayList<String> constraints = new ArrayList<String>();
    private ArrayList<Bien> danhSachBien = new ArrayList<Bien>();
    private ArrayList<Bien> danhSachThamSo = new ArrayList<Bien>();
    private String solution = "";
    private int solvingTime = 0;
    private int numLoop = 0, canDuoi = 0, canTren = 0;

    public static void main(String[] args) {
        ArrayList<String> testpaths = Utils1.convertToString(
                "(int a[][2]={{1,2},{0,4},{3,5}})#(int x=1)#!(m%2==1&&n%2>0)#!(a[n%2][m%2]==a[n%2+1][m%2]+b[(m%2)*(n%2)])#(return 1/x)",
                "#");

        ArrayList<String> testcases = Utils1.convertToString("int m,int n,int b[]", ",");

        int numLoop = 1000;
        int canDuoi = -20;
        int canTren = 20;

        ArrayList<String> equationList = new solver.symbolicExecution.ParseTestpath(testpaths, testcases).getOutput();
        RandomSolver solver = new RandomSolver(testcases, equationList, numLoop, canDuoi, canTren);
        System.out.println(solver.getSolution());
    }

    public RandomSolver(ArrayList<String> testcase, ArrayList<String> equationList, int numLoop, int canDuoi,
            int canTren) {
        this.constraints = chuanHoaHeRangbuoc(equationList);
        this.danhSachThamSo = chuanHoaDanhSachThamSo(testcase);
        this.numLoop = numLoop;
        this.canDuoi = canDuoi;
        this.canTren = canTren;

        Timer timer = new Timer();
        timer.start();

        solve();

        timer.end();
        solvingTime = timer.getRunningTime();
    }

    @Override
    public void solve() {
        boolean isSolution = false;
        for (int i = 0; i < numLoop; i++) {
            this.danhSachBien = layDanhSachBien(this.danhSachThamSo);
            khoiTaoGiaTriDanhSachBien(danhSachBien, canDuoi, canTren);
            isSolution = danhGiaHeRangBuoc(constraints, danhSachBien);
            if (!isSolution) {
                continue;
            } else {
                break;
            }
        }
        solution = isSolution ? danhSachBien.toString() : NOT_FOUND_SOLUTION;
    }

    /**
     * Láº¥y danh sÃ¡ch biáº¿n tá»« danh sÃ¡ch tham sá»‘
     *
     * @param danhSachThamSo
     * @return
     */
    private ArrayList<Bien> layDanhSachBien(ArrayList<Bien> danhSachThamSo) {
        ArrayList<Bien> danhSachBien = new ArrayList<>();
        for (Bien var : danhSachThamSo) {
            if (var.getType() == Bien.DOUBLE || var.getType() == Bien.INT) {
                danhSachBien.add(var);
            }
        }
        return danhSachBien;
    }

    /**
     * Ä�Ã¡nh giÃ¡ táº­p biá»ƒu thá»©c logic
     *
     * @param constraints Táº­p biá»ƒu thá»©c logic cÃ³ chá»©a biáº¿n
     * @param danhSachBien GiÃ¡ trá»‹ cÃ¡c biáº¿n trong biá»ƒu thá»©c logic
     * @return
     */
    private boolean danhGiaHeRangBuoc(ArrayList<String> constraints, ArrayList<Bien> danhSachBien) {
        boolean isSolution = false;
        for (String bieuThucLogic : constraints) {
            bieuThucLogic = bieuThucLogic.replace("--", "");
            isSolution = danhGiaBieuThucLogic(bieuThucLogic, danhSachBien);
            if (isSolution) {
                continue;
            } else {
                break;
            }
        }
        return isSolution;
    }

    /**
     * Khá»Ÿi táº¡o giÃ¡ trá»‹ táº¥t cáº£ cÃ¡c biáº¿n
     *
     * @param danhSachBien
     */
    private void khoiTaoGiaTriDanhSachBien(ArrayList<Bien> danhSachBien, int canDuoi, int canTren) {
        for (Bien var : danhSachBien) {
            var.generateNewValue(canDuoi, canTren);
        }
    }

    /**
     * Ä�Ã¡nh giÃ¡ biá»ƒu thá»©c logic Ä‘Ãºng hay sai
     *
     * @param bieuThucLogic Biá»ƒu thá»©c logic chá»©a biáº¿n
     * @param danhSachBien LÆ°u giÃ¡ trá»‹ cÃ¡c biáº¿n
     * @return
     */
    private boolean danhGiaBieuThucLogic(String bieuThucLogic, ArrayList<Bien> danhSachBien) {
        do {
            bieuThucLogic = thayTheBienVoiGiaTri(bieuThucLogic, danhSachBien);
            bieuThucLogic = rutGonChiSoMang(bieuThucLogic);
            bieuThucLogic = rutGonSoThuc(bieuThucLogic);
            ArrayList<String> danhSachBienMang = layDanhSachBienMang(bieuThucLogic);
            danhSachBien = capNhatDanhSachBien(danhSachBienMang, danhSachBien);
            danhSachBien = khoiTaoGiaTriBienNull(danhSachBien, canDuoi, canTren);
        } while (bieuThucLogic.contains(ARRAY_SYMBOL));
        boolean giaTri = danhGiaBieuThucLogic(bieuThucLogic);
        return giaTri;
    }

    /**
     * Khá»Ÿi táº¡o giÃ¡ trá»‹ cho nhá»¯ng biáº¿n chÆ°a cÃ³ giÃ¡ trá»‹
     *
     * @param danhSachBien
     * @param canDuoi
     * @param canTren
     * @return
     */
    private ArrayList<Bien> khoiTaoGiaTriBienNull(ArrayList<Bien> danhSachBien, int canDuoi, int canTren) {
        for (Bien var : danhSachBien) {
            if (var.getValue() == null || var.getValue().equals("")) {
                var.generateNewValue(canDuoi, canTren);
            }
        }
        return danhSachBien;
    }

    /**
     * ThÃªm biáº¿n máº£ng vÃ o danh sÃ¡ch biáº¿n
     *
     * @param arrayVarList
     */
    private ArrayList<Bien> capNhatDanhSachBien(ArrayList<String> danhSachBienMang, ArrayList<Bien> danhSachBien) {
        for (String bienMang : danhSachBienMang) {
            int typeVar = layKieuBienMang(bienMang, danhSachThamSo);
            Bien b = new Bien(bienMang, typeVar);
            danhSachBien.add(b);
        }
        return danhSachBien;
    }

    private int layKieuBienMang(String arrayVar, ArrayList<Bien> danhSachThamSo) {
        int kieuBien = 0;
        String tenBien = Utils.getNameOfArrayItem(arrayVar);
        for (Bien var : danhSachThamSo) {
            if (var.getName().equals(tenBien)) {
                kieuBien = var.getType();
                break;
            }
        }
        return kieuBien;
    }

    /**
     * Ä�Ã¡nh giÃ¡ tÃ­nh Ä‘Ãºng sai cá»§a biá»ƒu thá»©c logic
     *
     * @param bieuThucLogic Biá»ƒu thá»©c logic khÃ´ng chá»©a biáº¿n
     * @return
     */
    private boolean danhGiaBieuThucLogic(String bieuThucLogic) {
        boolean giaTriLuanLy = false;
        try {
            String giaTri = new Evaluator().evaluate(bieuThucLogic.replace(" ", "").replace("--", "-"));
            giaTriLuanLy = giaTri.equals("1.0") ? true : false;
        } catch (EvaluationException e) {
            System.out.println("Error at:" + bieuThucLogic);
            e.printStackTrace();
        }
        return giaTriLuanLy;
    }

    /**
     * Thay tháº¿ cÃ¡c biáº¿n trong biá»ƒu thá»©c logic vá»›i giÃ¡ trá»‹ cá»¥
     * thá»ƒ
     *
     * @param bieuThucLogic
     * @param danhSachBien
     * @return
     */
    private String thayTheBienVoiGiaTri(String bieuThucLogic, ArrayList<Bien> danhSachBien) {
        String output = " " + bieuThucLogic + " ";
        for (Bien var : danhSachBien) {
            output = output.replaceAll("\\b" + Utils.toRegex(var.getName()), var.getValue());
        }
        return output;
    }

    /**
     * Láº¥y danh sÃ¡ch biáº¿n máº£ng cÃ³ trong biá»ƒu thá»©c logic
     *
     * @return
     */
    private ArrayList<String> layDanhSachBienMang(String expression) {
        ArrayList<String> arrayItemList = new ArrayList<>();
        // do something here
        Matcher m = Pattern.compile("\\w+(\\[([^\\]])+\\])+").matcher(expression);
        while (m.find()) {
            if (!arrayItemList.contains(m.group(0))) {
                arrayItemList.add(m.group(0));
            }
        }
        return arrayItemList;
    }

    /**
     * TÃ­nh toÃ¡n giÃ¡ trá»‹ chá»‰ sá»‘ máº£ng náº¿u lÃ  má»™t biá»ƒu thá»©c.
     * Ex: a[1+2] => a[3] <br/> a[1/2] => a[0] a[1+a[3+1]] =>a[1+a[4]]
     *
     * @param expression
     * @return
     */
    private String rutGonChiSoMang(String bieuThucLogic) {
        String output = bieuThucLogic;
        output = output + "@";// to simplify regex
        Matcher m = Pattern.compile("\\[([^\\]\\[]+)\\]").matcher(output);
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, "[" + new myJeval().evaluate(m.group(1)) + "]");
        }
        m.appendTail(sb);
        return sb.deleteCharAt(sb.length() - 1).toString();
    }

    /**
     * Remove unneccessary ".0" String. Ex: 1.0 => 1<br/> 2.01+3.0=>2.01+3
     *
     * @param expression
     * @return
     */
    private String rutGonSoThuc(String expression) {
        expression = expression + "@";// to simplify regex
        Matcher m = Pattern.compile("(\\d)\\.0([^\\d])").matcher(expression);
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, m.group(1) + m.group(2));
        }
        m.appendTail(sb);
        return sb.deleteCharAt(sb.length() - 1).toString();
    }

    /**
     * PhÃ¢n tich há»‡ rÃ ng buá»™c dáº¡ng xÃ¢u vá»� dáº¡ng danh sÃ¡ch liÃªn
     * káº¿t
     *
     * @param constraints há»‡ rÃ ng buá»™c dáº¡ng xÃ¢u
     * @param delimiter kÃ­ tá»± phÃ¢n tÃ¡ch cÃ¡c biá»ƒu thá»©c loogic trong
     * há»‡ rÃ ng buá»™c Ä‘áº§u vÃ o
     * @return
     */
    private ArrayList<String> chuanHoaHeRangbuoc(ArrayList<String> equationList) {
        ArrayList<String> output = new ArrayList<String>();
        for (String bieuThucLogic : equationList) {
            output.add(bieuThucLogic);
        }
        return output;
    }

    /**
     * Chuáº©n hÃ³a danh sÃ¡ch tham sá»‘ truyá»�n vÃ o vá»� dáº¡ng danh sÃ¡ch
     * liÃªn káº¿t
     *
     * @param danhSachThamSo
     * @return
     */
    private ArrayList<Bien> chuanHoaDanhSachThamSo(ArrayList<String> testcase) {
        ArrayList<Bien> variableList = new ArrayList<>();

        for (String khaiBao : testcase) {
            String type = khaiBao.split(" ")[0];
            if (khaiBao.contains("]")) {
                String name = khaiBao.substring(khaiBao.indexOf(" ") + 1, khaiBao.indexOf("["));
                if (khaiBao.contains("][")) // náº¿u lÃ  máº£ng hai chiá»�u
                {
                    switch (type) {
                        case "int":
                            variableList.add(new Bien(name, Bien.INT_ARRAY_TWO_DIMENSION));
                            break;
                        case "double":
                            variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_TWO_DIMENSION));
                            break;
                    }
                } else // náº¿u lÃ  máº£ng 1 chiá»�u
                {
                    switch (type) {
                        case "int":
                            variableList.add(new Bien(name, Bien.INT_ARRAY_ONE_DIMENSION));
                            break;
                        case "double":
                            variableList.add(new Bien(name, Bien.DOUBLE_ARRAY_ONE_DIMENSION));
                            break;
                    }
                }
            } else { // náº¿u khÃ´ng pháº£i khai bÃ¡o máº£ng
                String name = khaiBao.split(" ")[1];
                switch (type) {
                    case "int":
                        variableList.add(new Bien(name, Bien.INT));
                        break;
                    case "double":
                        variableList.add(new Bien(name, Bien.DOUBLE));
                        break;
                }
            }
        }
        return variableList;
    }

    @Override
    public String getSolution() {
        return solution;
    }

    @Override
    public int getSolvingTime() {
        return solvingTime;
    }
    private static final String ARRAY_SYMBOL = "[";
    public static final String NOT_FOUND_SOLUTION = "-";
}
