package edu.cit.nasamanagementsystem.dto;

public class DashboardStatsDTO {
    private long total;
    private long approved;
    private long pending;
    private long rejected;

    // Getters and Setters
    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }

    public long getApproved() { return approved; }
    public void setApproved(long approved) { this.approved = approved; }

    public long getPending() { return pending; }
    public void setPending(long pending) { this.pending = pending; }

    public long getRejected() { return rejected; }
    public void setRejected(long rejected) { this.rejected = rejected; }
}
