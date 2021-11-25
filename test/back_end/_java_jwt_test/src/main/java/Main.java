import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Main {
    private JLabel label;
    private MyPanel panel1;

    public void start() {
        // JFrame
        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1000, 800);
        frame.addKeyListener(new GlobalKeyboardCommand());

        // JPanel
        JPanel panel = new JPanel();
        panel.setBackground(Color.GREEN);
        panel.setLayout(new BorderLayout());
        panel.addMouseListener(new ClickListener());
        panel.addMouseMotionListener(new MovementListener());

        // JLabel
        JLabel label = new JLabel("(0, 0)", JLabel.CENTER);
        label.setFont(new Font("Arial", 1, 30));
        this.label = label;

        MyPanel panel1 = new MyPanel();
        panel1.setPreferredSize(new Dimension(1000, 100));
        this.panel1 = panel1;

        // add label
        panel.add(label, BorderLayout.CENTER);

        // add panel
        frame.add(panel, BorderLayout.CENTER);
        frame.add(panel1, BorderLayout.SOUTH);

        // present frame
        frame.setVisible(true);
    }

    class ClickListener implements MouseListener {
        @Override
        public void mouseClicked(MouseEvent e) {
            panel1.repaint();
        }

        @Override
        public void mousePressed(MouseEvent e) {

        }

        @Override
        public void mouseReleased(MouseEvent e) {

        }

        @Override
        public void mouseEntered(MouseEvent e) {

        }

        @Override
        public void mouseExited(MouseEvent e) {

        }
    }

    class MovementListener implements MouseMotionListener {
        @Override
        public void mouseDragged(MouseEvent e) {
        }

        @Override
        public void mouseMoved(MouseEvent e) {
            label.setText("(" + e.getX() + ", " + e.getY() + ")");
        }
    }

    class GlobalKeyboardCommand implements KeyListener {
        @Override
        public void keyTyped(KeyEvent e) {
        }

        @Override
        public void keyPressed(KeyEvent e) {
            if (e.getKeyCode() == KeyEvent.VK_ESCAPE) {
                System.exit(0);
            }
        }

        @Override
        public void keyReleased(KeyEvent e) {
        }
    }

    class MyPanel extends JPanel {
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            System.out.println("MyPanel.paintComponent by " + this);
        }

        @Override
        public void paint(Graphics g) {
            super.paint(g);
            System.out.println("MyPanel.paint by " + this);
        }
    }

    public static void main(String[] args) {
        new Main().start();
    }
}
