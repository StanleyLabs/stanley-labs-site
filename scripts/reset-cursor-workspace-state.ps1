# Reset Cursor workspace state for stanley-labs-site
# This clears the saved layout (tabs, panels, Simple Browser) so the whiteboard
# panel stops restoring when you open this workspace.
#
# Prerequisite: Close Cursor completely before running this script.

$workspaceStoragePath = "$env:APPDATA\Cursor\User\workspaceStorage\1c37034ff7d07b0013951a87a939930d"
$stateFile = Join-Path $workspaceStoragePath "state.vscdb"
$backupFile = Join-Path $workspaceStoragePath "state.vscdb.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "Reset Cursor Workspace State" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

# Check if state file exists
if (-not (Test-Path $stateFile)) {
    Write-Host "No state.vscdb found. Workspace state may already be reset." -ForegroundColor Yellow
    exit 0
}

# Check if Cursor might be running (state.vscdb could be locked)
$cursorProcess = Get-Process -Name "Cursor" -ErrorAction SilentlyContinue
if ($cursorProcess) {
    Write-Host "WARNING: Cursor appears to be running. Close it first to avoid file lock issues." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "Will perform:" -ForegroundColor White
Write-Host "  1. Backup:  $stateFile" -ForegroundColor Gray
Write-Host "     ->      $backupFile" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Delete:  $stateFile" -ForegroundColor Gray
Write-Host ""
Write-Host "Next time you open Cursor with stanley-labs-site, the layout will be fresh" -ForegroundColor Gray
Write-Host "(no whiteboard panel). Your project files are not affected." -ForegroundColor Gray
Write-Host ""

# Backup first
Copy-Item -Path $stateFile -Destination $backupFile -Force
Write-Host "[OK] Backed up to: $backupFile" -ForegroundColor Green

# Delete the state file
Remove-Item -Path $stateFile -Force
Write-Host "[OK] Removed state.vscdb" -ForegroundColor Green

Write-Host ""
Write-Host "Done. You can reopen Cursor now." -ForegroundColor Cyan
