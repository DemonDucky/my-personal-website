<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo';

	const messages = {
		aboutAuthor: 'Về tác giả',
		authorName: 'Lương Tuấn Anh',
		authorBio:
			'Mình xuất phát từ marketing, nhưng thích tự tay xây cả sản phẩm lẫn thương hiệu. Blog này là nơi mình ghi lại những gì học được khi biến ý tưởng thành thứ có thể chạm được, thấy được.',
		followMe: 'Theo dõi tôi'
	};
</script>

<!-- Author Card -->
<section class="border-border mt-12 border-t pt-8" itemscope itemtype="https://schema.org/Person">
	<div class="bg-muted/30 rounded-lg p-6">
		<h3 class="text-foreground mb-4 text-xl font-semibold">{messages.aboutAuthor}</h3>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
			<!-- Author Avatar -->
			<div class="flex-shrink-0">
				<div
					class="bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
					itemprop="image"
					role="img"
					aria-label="Avatar của {messages.authorName}"
				>
					{messages.authorName.charAt(0)}
				</div>
			</div>

			<!-- Author Info -->
			<div class="flex-1 space-y-3">
				<div>
					<h4 class="text-foreground text-lg font-medium" itemprop="name">
						{messages.authorName}
					</h4>
					<p class="text-muted-foreground text-sm leading-relaxed" itemprop="description">
						{messages.authorBio}
					</p>
				</div>

				<!-- Social Links -->
				<div class="flex items-center gap-2">
					<span class="text-muted-foreground text-sm">{messages.followMe}:</span>
					<div class="flex gap-2">
						<Button
							variant="outline"
							href="https://github.com/demonducky"
							target="_blank"
							rel="noopener noreferrer"
							size="icon"
							class="h-8 w-8 p-0"
							itemprop="sameAs"
							aria-label="GitHub của {messages.authorName}"
						>
							<GithubLogo size={16} />
							<span class="sr-only">GitHub</span>
						</Button>
						<Button
							variant="outline"
							href="https://www.facebook.com/tuananh.luonggg/"
							target="_blank"
							rel="noopener noreferrer"
							size="icon"
							class="h-8 w-8 p-0"
							itemprop="sameAs"
							aria-label="Facebook của {messages.authorName}"
						>
							<FacebookLogo size={16} />
							<span class="sr-only">Facebook</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
