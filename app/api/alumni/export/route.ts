import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { requireRole } from '@/lib/auth'
import prisma from '@/lib/prisma'
import ExcelJS from 'exceljs'

export async function GET(request: NextRequest) {
    const userOrError = await requireRole([UserRole.SUPERADMIN, UserRole.WRITER])
    if (userOrError instanceof NextResponse) {
        return userOrError
    }

    try {
        const alumni = await prisma.alumni.findMany({
            orderBy: { createdAt: 'desc' }
        })

        // Create workbook and worksheet
        const workbook = new ExcelJS.Workbook()
        workbook.creator = 'SPE UP Profile'
        workbook.created = new Date()

        const worksheet = workbook.addWorksheet('Alumni Data', {
            headerFooter: {
                firstHeader: 'SPE UP Alumni Data'
            }
        })

        // Define columns
        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Institution', key: 'institution', width: 25 },
            { header: 'Phone', key: 'phone', width: 18 },
            { header: 'Position', key: 'position', width: 25 },
            { header: 'Message', key: 'message', width: 40 },
            { header: 'Photo', key: 'photoPath', width: 40 },
            { header: 'Type', key: 'type', width: 15 },
            { header: 'Registered At', key: 'createdAt', width: 18 }
        ]

        // Style header row
        const headerRow = worksheet.getRow(1)
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF3C8C98' }
        }
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
        headerRow.height = 25

        // Add data rows
        alumni.forEach((alum, index) => {
            worksheet.addRow({
                no: index + 1,
                name: alum.name,
                email: alum.email,
                institution: alum.institution,
                phone: alum.phone,
                position: alum.position,
                message: alum.message,
                photoPath: alum.photoPath || '-',
                type: alum.isNewData ? 'New Data' : 'Update Data',
                createdAt: alum.createdAt.toLocaleDateString('id-ID')
            })
        })

        // Style data rows
        for (let i = 2; i <= alumni.length + 1; i++) {
            const row = worksheet.getRow(i)
            row.alignment = { vertical: 'middle', wrapText: true }
            row.border = {
                top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
                right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
            }
            // Alternate row colors
            if (i % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF5F5F5' }
                }
            }
        }

        // Generate buffer
        const buffer = await workbook.xlsx.writeBuffer()

        // Return Excel file
        const filename = `alumni_data_${new Date().toISOString().split('T')[0]}.xlsx`
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (error) {
        console.error('Export alumni error:', error)
        return NextResponse.json(
            { error: 'Failed to export alumni data' },
            { status: 500 }
        )
    }
}
