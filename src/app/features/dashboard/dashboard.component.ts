import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { AdminStats } from '../../core/models/admin.model';
import { ToastService } from '../../shared/services/toast.service';
import { KpiCardComponent } from '../../shared/components/ui/kpi-card/kpi-card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LucideAngularModule } from 'lucide-angular';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, NgxEchartsModule, LucideAngularModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private adminService = inject(AdminService);
  public authService = inject(AuthService); // Public for template access
  private toastService = inject(ToastService);

  stats = signal<AdminStats | null>(null);
  loading = signal<boolean>(true);
  currentDate = new Date();

  // ECharts Configurations
  lineChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#E2E8F0',
      textStyle: { color: '#0F172A', fontFamily: 'Inter' },
      extraCssText: 'box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05); border-radius: 12px;'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: { color: '#64748B', fontFamily: 'Inter' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#64748B', fontFamily: 'Inter' }
    },
    series: [
      {
        name: 'Commandes',
        type: 'line',
        smooth: true,
        showSymbol: false,
        itemStyle: { color: '#2563EB' },
        lineStyle: { width: 3, shadowColor: 'rgba(37, 99, 235, 0.2)', shadowBlur: 10, shadowOffsetY: 5 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(37, 99, 235, 0.15)' }, { offset: 1, color: 'rgba(37, 99, 235, 0)' }]
          }
        },
        data: [120, 132, 101, 134, 290, 230, 210]
      }
    ]
  };

  donutChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#E2E8F0',
      textStyle: { color: '#0F172A', fontFamily: 'Inter' },
      extraCssText: 'box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05); border-radius: 12px;'
    },
    legend: { bottom: '0%', left: 'center', itemStyle: { borderWidth: 0 }, textStyle: { color: '#64748B', fontFamily: 'Inter' } },
    series: [
      {
        name: 'Paiements',
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 1048, name: 'Wave', itemStyle: { color: '#2563EB' } },
          { value: 735, name: 'Orange Money', itemStyle: { color: '#F59E0B' } },
          { value: 580, name: 'MTN Money', itemStyle: { color: '#10B981' } },
          { value: 484, name: 'Moov Money', itemStyle: { color: '#3B82F6' } }
        ]
      }
    ]
  };

  barChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#E2E8F0',
      textStyle: { color: '#0F172A', fontFamily: 'Inter' },
      extraCssText: 'box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05); border-radius: 12px;',
      axisPointer: { type: 'shadow' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: { color: '#64748B', fontFamily: 'Inter' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#64748B', fontFamily: 'Inter' }
    },
    series: [
      {
        name: 'Missions Terminées',
        type: 'bar',
        barWidth: '40%',
        itemStyle: { color: '#10B981', borderRadius: [4, 4, 0, 0] },
        data: [45, 52, 38, 65, 89, 70, 60]
      }
    ]
  };

  ngOnInit() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.toastService.error("Erreur", "Impossible de récupérer les statistiques.");
        console.error("Erreur de récupération des stats", err);
        this.loading.set(false);
      }
    });
  }
}
